export interface Skill {
    name: String;
    value : String;
    main : Boolean;
    image : String
}
export interface Lang {
    name: String;
    value : String;
    main : Boolean;
    image : String
}

export interface Landing {
    img: String;
}

export interface Work {
    id: String;
    name: String;
    link : String;
    image: String
    details: String;
}


export interface personalData {
    id?: string;
    github? : String;
    gmail? : String;
    instagram? : String;
    phone ?: String;
    twitter? : String;
}

export interface Blog {
    id : String;
    name : String;
    image : String;
    details : String;
} 