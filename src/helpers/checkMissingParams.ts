const checkMissingParams = (...params: any[]) => {
    for (const param of params) {
        if (param === undefined || param === null) {
            throw new Error("Insert all required information");
        }
    }
};

export default checkMissingParams;
