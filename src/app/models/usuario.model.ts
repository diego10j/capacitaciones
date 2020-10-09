import { environment } from '../../environments/environment';


export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public uid?: string,
    ) {}

    get imagenUrl() {

        if ( !this.img ) {
            return `${ environment.api_rest }/upload/no-img.jpg`;
        } else if ( this.img.includes('https') ) {
            return this.img;
        } else if ( this.img ) {
            return `${ environment.api_rest }/upload/${ this.img }`;
        } else {
            return `${ environment.api_rest }/upload/no-img.jpg`;
        }
    }
}

