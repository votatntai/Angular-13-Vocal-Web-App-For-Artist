export interface ProjectDetail {
    id: string,
    poster: Poster,
    name: string,
    minAge: number,
    maxAge: number,
    price: number,
    description: string,
    status: string,
    responseDeadline: string,
    projectDeadline: string,
    createDate: string,
    updateDate: string,
    artistProjectsFiles: ArtistProjectsFiles[],
    customerProjectsFiles: CustomerProjectsFiles[],
    artistProject: ArtistProject[],
    projectCountries: string[],
    projectGenders: string[],
    projectUsagePurposes: string[],
    projectVoiceStyles: string[],
}

export interface Poster {
    id: string,
    username: string,
    firstName: string,
    avatar: string,
    lastName: string,
    email: string,
    phone: string,
    gender: string,
    role: string,
    status: string,
    createDate: string,
    updateDate: string
}

export interface ArtistProjectsFiles {
    id: string,
    name: string,
    url: string,
    mediaType: number,
    status: string,
    description: string,
    comment: string,
    createBy: string,
    createDate: string,
}

export interface CustomerProjectsFiles {
    id: string,
    name: string,
    url: string,
    mediaType: number,
    status: string,
    description: string,
    comment: string,
    createBy: string,
    createDate: string,
}

export interface ArtistProject {
    quickArtistResponse: QuickArtistResponse[],
    invitedDate: string,
    requestedDate: string,
    joinedDate: string,
    canceledDate: string,
    finishedDate: string,
    reviewDate: string,
    status: string,
    rate: number,
    comment: string,
}

export interface QuickArtistResponse {
    id: string,
    username: string,
    firstName: string,
    lastName: number,
    email: string,
    phone: string,
    bio: string,
    gender: string,
    studio: number,
    price: number,
    rate: number,
    status: string,
    avatar: string,
    countries: string[],
    voiceStyles: string[],
}