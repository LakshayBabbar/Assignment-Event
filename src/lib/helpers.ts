export const resizeImage = (dataUrl: string, targetWidth: number, targetHeight: number): Promise<string> => {
    return new Promise<string>((resolve) => {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const { width: originalWidth, height: originalHeight } = img;
            const scale = Math.max(targetWidth / originalWidth, targetHeight / originalHeight);
            const newWidth = originalWidth * scale;
            const newHeight = originalHeight * scale;
            const offsetX = (newWidth - targetWidth) / 2;
            const offsetY = (newHeight - targetHeight) / 2;

            ctx.drawImage(img, -offsetX, -offsetY, newWidth, newHeight);

            resolve(canvas.toDataURL("image/jpeg", 0.9));
        };
    });
};


export const getVideoThumbnail = (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        video.currentTime = 1;

        video.onloadeddata = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL("image/jpeg"));
            } else {
                resolve(null);
            }
            URL.revokeObjectURL(video.src);
        };

        video.onerror = () => resolve(null);
    });
};