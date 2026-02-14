import { useRef, useState } from "react";

interface UseAutoSaveHook {
	setDataToSave: (data: { data: string; type: "title" | "content" }) => void;
	autosave: () => void;
	saving: boolean;
}

export default function useAutoSave(): UseAutoSaveHook {
	const [dataToSave, setDataToSave] = useState({ data: "", type: "content" });
	const [saving, setSaving] = useState(false);
	const keyUpTimer = useRef<number | null>(null);

	function saveData() {
		// function that will send the data to your backend to save to a database
		if (dataToSave.type === "title") {
			console.log(
				"Successfully saved data:",
				dataToSave.data.trim() || "Untitled Document"
			);
		}
	}

	function autosave() {
		setSaving(true);
		if (keyUpTimer.current) {
			clearTimeout(keyUpTimer.current);
		}

		keyUpTimer.current = window.setTimeout(() => {
			saveData();
			setSaving(false);
		}, 500); // half a second
	}
	return { setDataToSave, autosave, saving };
}
