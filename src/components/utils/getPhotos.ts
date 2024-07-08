import { unpsplashApiKey } from "../../data/private";

const getPhotos = async (query: string) => {
    console.log(window);
    const { innerHeight: height, innerWidth: width } = window;
    const aspect = width / height;
    const orientation = aspect > 1.2 ? "landscape" : aspect < 0.8 ? "portrait" : "squarish";
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${unpsplashApiKey}&count=10&query=${query}&orientation=${orientation}`);
    const json = await response.json();
    return json;
}

export default getPhotos;
