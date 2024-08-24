import { useCallback, useEffect, useState } from "react";

const initializeState = (key: string) => {
	if (typeof window === 'undefined') {
		return;
	}
	const currentValue = window.localStorage.getItem(key);
	if (!currentValue) {
		return;
	}
	try {
		return JSON.parse(currentValue);
	} catch (e) {
		return;
	}
};

export function usePersistedState<TValue = any>({ key }: { key: string }) {
	const [value, setValue] = useState<TValue>();

	useEffect(() => {
		setValue(initializeState(key));
	}, [key]);

	const onSetValue = useCallback(
		(currentValue: (prevState: TValue | undefined) => TValue | undefined) => {
			setValue((prevState) => {
				try {
					if (typeof currentValue === "function") {
						const newValue = currentValue(prevState);
						if (newValue) {
							window.localStorage.setItem(key, JSON.stringify(newValue));
							return newValue;
						}
					} else {
						window.localStorage.setItem(key, JSON.stringify(currentValue));
						return currentValue;
					}
				} catch (error) {
					return prevState;
				}
				return prevState;
			});
		},
		[key]
	);

	return { value, setValue: onSetValue };
}
