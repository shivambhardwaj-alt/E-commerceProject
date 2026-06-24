const processFiles = (files) => {

    let n = files.length;
    const res = Array.from({ length: n }, () => []);
    files.forEach((file) => {
        const index = Number(
            file.fieldname.match(/variant_(\d+)_images/)[1]
        );

        if (!res[index]) {
            res[index] = [];
        }

        res[index].push(file);
    });
    return res;
}


export { processFiles };