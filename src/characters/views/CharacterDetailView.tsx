interface Character {
    image: string;
    name: string;
    species: string;
    status: string;
    occupation?: string; // Agregamos occupation si está en el diseño
}

export const CharacterDetailView = ({ character }: { character: Character }) => {
    return (
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto">
            {/* Imagen del personaje */}
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <img
                    src={character.image}
                    alt={character.name}
                    className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full"
                />
            </div>

            {/* Detalles del personaje */}
            <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {character.name}
                </h2>
                <ul className="text-gray-600 text-lg space-y-2">
                    <li>
                        <span className="font-semibold">Specie:</span> {character.species}
                    </li>
                    <li>
                        <span className="font-semibold">Status:</span> {character.status}
                    </li>
                    {character.occupation && (
                        <li>
                            <span className="font-semibold">Occupation:</span> {character.occupation}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};
