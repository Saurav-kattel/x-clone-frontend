export function deleteFromImageChache({ imageId }: { imageId: string }) {
	if (typeof window !== 'undefined' && window.localStorage) {
		const imageCache = JSON.parse(localStorage.getItem("image") || "{}");
		delete imageCache[imageId];
		localStorage.setItem("image", JSON.stringify(imageCache))
		return
	}
}
