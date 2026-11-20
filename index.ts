/** Ask the owner one question through Pi's built-in UI dialogs. */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";

const Params = Type.Object({
	question: Type.String({ description: "Question to show the owner" }),
	options: Type.Optional(Type.Array(Type.String(), { minItems: 2, maxItems: 6, description: "Choices for a selection" })),
	kind: Type.Optional(Type.Union([Type.Literal("select"), Type.Literal("confirm"), Type.Literal("input")], {
		description: "Dialog type; defaults to select when options exist, otherwise input",
	})),
});

export default function (pi: ExtensionAPI) {
	pi.registerTool({
		name: "ask",
		label: "Ask",
		description: "Ask the owner a genuine unresolved choice using Pi's interactive UI.",
		promptGuidelines: ["Use ask only for a genuine choice the task cannot settle alone; never ask permission to do an assigned task."],
		parameters: Params,
		executionMode: "sequential",
		async execute(_toolCallId, params, _signal, _onUpdate, ctx) {
			if (!ctx.hasUI) {
				return { content: [{ type: "text", text: "no one to ask; proceed with your best judgment and say which assumption you made" }] };
			}

			const kind = params.kind ?? (params.options ? "select" : "input");
			if (kind === "confirm") {
				const answer = await ctx.ui.confirm(params.question, "");
				return { content: [{ type: "text", text: `answer: ${answer}` }] };
			}

			const answer = kind === "select"
				? await ctx.ui.select(params.question, params.options ?? [])
				: await ctx.ui.input(params.question);
			return { content: [{ type: "text", text: answer === undefined ? "cancelled" : `answer: ${answer}` }] };
		},
	});
}
