export const graphql = (query = {}, variables = {}) => {
    return fetch("/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    }).then((res) => res.json());
};
