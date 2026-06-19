import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { verifyToken } from "../../../lib/jwt";
import { validateStartupIdea } from "../../../lib/openrouter";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const { title, problem, solution, targetUsers } = await req.json();

    if (!title || !problem || !solution || !targetUsers) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const idea = await prisma.startupIdea.create({
      data: {
        title,
        problem,
        solution,
        targetUsers,
        userId: decoded.userId,
      },
    });

    const aiReport = await validateStartupIdea({
      title,
      problem,
      solution,
      targetUsers,
    });

    const report = await prisma.validationReport.create({
      data: {
        score: aiReport.score,
        marketDemand: aiReport.marketDemand,
        competitionLevel: aiReport.competitionLevel,
        revenuePotential: aiReport.revenuePotential,
        riskLevel: aiReport.riskLevel,
        risks: aiReport.risks,
        mvpFeatures: aiReport.mvpFeatures,
        recommendation: aiReport.recommendation,
        rawReport: JSON.stringify(aiReport),
        startupIdeaId: idea.id,
      },
    });

    return NextResponse.json(
      {
        message: "Startup idea validated successfully",
        idea,
        report,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}