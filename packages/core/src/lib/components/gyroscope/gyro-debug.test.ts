import { render } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import Gyroscope from "./Gyroscope.svelte";

describe.skip("gyro-debug (device API)", () => {
	it("listeners", () => {
		const listeners: Record<string, ((event: Event) => void)[]> = {};
		vi.stubGlobal("window", {
			addEventListener: (e: string, cb: (event: Event) => void) => {
				(listeners[e] ??= []).push(cb);
			},
			removeEventListener: () => {},
		});
		render(Gyroscope, { enabled: true });
		console.log(
			"LEN",
			Object.keys(listeners)
				.map((k) => `${k}:${listeners[k].length}`)
				.join(",") || "NONE",
		);
	});
});
