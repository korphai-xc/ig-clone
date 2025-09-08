export interface BreedResult {
    mainBreed: string;
    subBreeds: string[];
}

export function searchBreeds(query: string): string[] {
    if (!query.trim()) {
        return [];
    }

    const breedResults: BreedResult[] = [];
    const searchTerm = query.toLowerCase().trim();

    const breeds = breedsData.message;

    for (const [mainBreed, subBreeds] of Object.entries(breeds)) {
        const mainBreedLower = mainBreed.toLowerCase();

        if (mainBreedLower.includes(searchTerm)) {
            breedResults.push({
                mainBreed,
                subBreeds: subBreeds as string[],
            });
            continue;
        }

        const matchingSubBreeds = (subBreeds as string[]).filter(subBreed =>
            subBreed.toLowerCase().includes(searchTerm)
        );

        if (matchingSubBreeds.length > 0) {
            breedResults.push({
                mainBreed,
                subBreeds: matchingSubBreeds,
            });
        }
    }

    return concatSubBreeds(breedResults);

}

export function getAllBreeds(): { [key: string]: string[] } {
    return breedsData.message;
}

export function concatSubBreeds(breeds: BreedResult[]): string[] {
    const result: string[] = [];
    for (const breed of breeds) {
        if (breed.subBreeds.length === 0) {
            result.push(breed.mainBreed);
            continue;
        }
        breed.subBreeds.forEach((subBreed) => {
            result.push(`${subBreed} ${breed.mainBreed}`);
        });
    }
    return result;
}

/* breeds data from https://dog.ceo/api/breeds/list/all
* breeds data format: { message: { [key: string]: string[] }, status: string }
* breads data is static
*/
const breedsData = {
    message: {
        affenpinscher: [],
        african: [],
        airedale: [],
        akita: [],
        appenzeller: [],
        australian: ["kelpie", "shepherd"],
        bakharwal: ["indian"],
        basenji: [],
        beagle: [],
        bluetick: [],
        borzoi: [],
        bouvier: [],
        boxer: [],
        brabancon: [],
        briard: [],
        buhund: ["norwegian"],
        bulldog: ["boston", "english", "french"],
        bullterrier: ["staffordshire"],
        cattledog: ["australian"],
        cavapoo: [],
        chihuahua: [],
        chippiparai: ["indian"],
        chow: [],
        clumber: [],
        cockapoo: [],
        collie: ["border"],
        coonhound: [],
        corgi: ["cardigan"],
        cotondetulear: [],
        dachshund: [],
        dalmatian: [],
        dane: ["great"],
        danish: ["swedish"],
        deerhound: ["scottish"],
        dhole: [],
        dingo: [],
        doberman: [],
        elkhound: ["norwegian"],
        entlebucher: [],
        eskimo: [],
        finnish: ["lapphund"],
        frise: ["bichon"],
        gaddi: ["indian"],
        germanshepherd: [],
        greyhound: ["indian", "italian"],
        groenendael: [],
        havanese: [],
        hound: [
            "afghan",
            "basset",
            "blood",
            "english",
            "ibizan",
            "plott",
            "walker",
        ],
        husky: [],
        keeshond: [],
        kelpie: [],
        kombai: [],
        komondor: [],
        kuvasz: [],
        labradoodle: [],
        labrador: [],
        leonberg: [],
        lhasa: [],
        malamute: [],
        malinois: [],
        maltese: [],
        mastiff: ["bull", "english", "indian", "tibetan"],
        mexicanhairless: [],
        mix: [],
        mountain: ["bernese", "swiss"],
        mudhol: ["indian"],
        newfoundland: [],
        otterhound: [],
        ovcharka: ["caucasian"],
        papillon: [],
        pariah: ["indian"],
        pekinese: [],
        pembroke: [],
        pinscher: ["miniature"],
        pitbull: [],
        pointer: ["german", "germanlonghair"],
        pomeranian: [],
        poodle: ["medium", "miniature", "standard", "toy"],
        pug: [],
        puggle: [],
        pyrenees: [],
        rajapalayam: ["indian"],
        redbone: [],
        retriever: ["chesapeake", "curly", "flatcoated", "golden"],
        ridgeback: ["rhodesian"],
        rottweiler: [],
        saluki: [],
        samoyed: [],
        schipperke: [],
        schnauzer: ["giant", "miniature"],
        segugio: ["italian"],
        setter: ["english", "gordon", "irish"],
        sharpei: [],
        sheepdog: ["english", "indian", "shetland"],
        shiba: [],
        shihtzu: [],
        spaniel: [
            "blenheim",
            "brittany",
            "cocker",
            "irish",
            "japanese",
            "sussex",
            "welsh",
        ],
        spitz: ["indian", "japanese"],
        springer: ["english"],
        stbernard: [],
        terrier: [
            "american",
            "australian",
            "bedlington",
            "border",
            "cairn",
            "dandie",
            "fox",
            "irish",
            "kerryblue",
            "lakeland",
            "norfolk",
            "norwich",
            "patterdale",
            "russell",
            "scottish",
            "sealyham",
            "silky",
            "tibetan",
            "toy",
            "welsh",
            "westhighland",
            "wheaten",
            "yorkshire",
        ],
        tervuren: [],
        vizsla: [],
        waterdog: ["spanish"],
        weimaraner: [],
        whippet: [],
        wolfhound: ["irish"],
    },
    status: "success",
};
