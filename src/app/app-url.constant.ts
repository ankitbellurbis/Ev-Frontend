import { environment } from 'src/environments/environment';

export const URLS = {
    baseAddressUrl: `${environment.addressHostName}/`,
    baseApiHostUrl: `${environment.apiHostName}/api/v1`,
    addressUrl: {
        endpoint: `search.php`,
    },
    user: {
        endpoint: 'users',
        methods: {
            register: 'register',
            login: 'login',
            logout: 'logout',
            refreshToken: 'refresh-token',
            update: 'update',
        },
    },
    station: {
        methods: {
            station: 'station',
        }
    },
    state: {
        endpoint: 'state'
    },
    city: {
        endpoint: 'city',
    }
}