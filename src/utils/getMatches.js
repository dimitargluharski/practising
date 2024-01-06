export const getMatches = async () => {
    const response = await fetch();
    const data = await response.json();

    console.log('data', data);
}