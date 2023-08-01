import axios from 'axios';

export const userSignIn = async (userSignInInfo, signInUrl) => {
    try {
        const res = await axios({
            method: 'post',
            url: signInUrl,
            data: JSON.stringify(userSignInInfo),
            headers: {'Content-Type': 'application/json'},
        });

        if (res?.status === 200) {
            localStorage.setItem('accessToken', res.headers.authorization);
            localStorage.setItem(
                'refreshToken',
                res.headers['authorization-refresh']
            );
            return res;
        }
    } catch (error) {
        throw error;
    }
};
