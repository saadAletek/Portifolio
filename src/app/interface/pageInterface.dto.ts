export interface Skill {
    name: String;
    value : String;
    main : Boolean;
    image : String
}
export interface Lang {
    image : String
    name: String;
    value : String;
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
    linkedin? : String;
    gmail? : String;
    phone ?: String;
    twitter? : String;
}

export interface Blog {
    id : String;
    name : String;
    image : String;
    details : String;
} 