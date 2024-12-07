interface Character {
    image: string;
    name: string;
    species: string;
    status: string;
}

export const CharacterDetailView = ({ character }: { character: Character }) => {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md p-6 w-full max-w-xl">
            <img
                src={character.image}
                alt={character.name}
                className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-2xl font-bold mt-4">{character.name}</h2>
            <p className="text-gray-600 mt-2">Species: {character.species}</p>
            <p className="text-gray-600">Status: {character.status}</p>
        </div>
    );
};
