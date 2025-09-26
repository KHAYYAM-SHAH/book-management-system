//book class where are reusable variable shave been defined for the book. so only call it for v=every book

export interface Book{
    id: number;
    title: string;
    author: string;
    genre?: string;    //? show sthe genre is not mandatory, user may or may not have idea of genre or book publishing year info. so through ? we make them optional for user
    yearPublished? :number;   //? show sthe genre is not mandatory, user may or may not have idea of genre or book publishing year info. so through ? we make them optional for user

}