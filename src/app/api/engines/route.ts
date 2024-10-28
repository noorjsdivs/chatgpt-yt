import openai from "@/src/lib/chatgpt";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await openai.models.list();
    const models = response.data;

    const modelOptions = models?.map((model) => ({
      value: model?.id,
      label: model?.id,
    }));

    return NextResponse.json(
      {
        success: true,
        modelOptions,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
};
