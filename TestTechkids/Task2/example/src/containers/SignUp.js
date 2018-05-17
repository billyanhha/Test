import React, { Component } from 'react';
import axios from '../axios';
import { Redirect } from 'react-router-dom'

class SignUp extends Component {
    state = {
    }
    _onSignUp = (e) => {
        this.setState({err: null})
        if (this.state.username && this.state.password && this.state.email) {
            e.preventDefault(),
                axios
                    .post("/api/users", {
                        username: this.state.username,
                        password: this.state.password,
                        fullname: this.state.fullname,
                        email: this.state.email,
                    })
                    .then(response => {
                        this.setState({ usernameLogin: response.data });
                        console.log(response)
                    }

                    )
                    .catch(err => {
                        console.log(err.response.data.errmsg)
                        this.setState({ err: err.response.data.errmsg })
                    }
                    );
        }
    };
    handleChangeText = (index, value) => {
        if (index === 0) this.setState({ username: value })
        else if (index === 1) this.setState({ fullname: value })
        else if (index === 2) this.setState({ password: value })
        else if (index === 3) this.setState({ email: value })
    }
    render() {
        if (this.state.usernameLogin) {
            return <Redirect to='/' />;
        }
        return (
            <div className="signup">
                <div className="form-signup">
                    <form>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX////2ixz2gwD2hQD2iBD+9Oz1gQD4p2D84sz2jRb+8Ob7yKH4rHH2iRX2hwD6yJ///Pj707T5uIP71bf4rGv95dL7z63969z+8un83cT82b7/+fT83sb7zKf2kSr5sXX3m0b3ljj4o1n6v5D3lTX3n076wJL5tX34pV33mEH2kiz2kzb5vIn2kCL5snn6wpkBBR6aAAAQmElEQVR4nN1d62LiLBOOgPG0pGrVWFOttbWtvtq9/7v7jIaBJJBAQhL2e37ttjXhcZgDwzB4XmuIbuiPw3E//kd7r20c0/B1+7E4nM69ACMGHPTOp8PiY/saTrseYA1E4exyCPyYD6GU9tKglJCYsx8cLrPw35Pp+nn+jmNqvXLERIP3+abf9aC1MZ79ufo4yAqtGDTA/vVttu568OUYXnYIEzN2wJJgdP4Ydk2hCMt5DxnKLi9LdL0suyYiRzgfoaAWO06ydwm7ppPFdPteRo/G1vMBmjetGQTotHLJj4S/PlYO+e4TEB7tTsfD4obB4HDYv+9Gd7+o1liK0dwVQW6OSO4UaMxtdJhvN8t+lJXINBoPN0/fB6LmGaDDayeM0njeIdn4bmYRHy+rZbkrj5ar79Ptr2XfEkGfmxY4FGEm43ebYGQwWZro0XT5dAhkdpiic5ccn695fjfhHSeVFGi6/HiX6HOHHIefOX4U459ZnRhzvd2jHEmKTl14yPFPlh/F/nFVP4ReP737WcdD/UXbUet07mcsA0Hnv7ZGEX6Msl8fQR+WHq6HWYDTAwj8hd14cvaedUG492L1DUUY71Hm5cGH/Um0XGSiJIoOLU3Vp8y3i4OnZgKs8XeGI8GrRl6UxjojQEwmzb0suuC0OqBD49mAWTr2uMmv2fdF8/SMIUHD2vjmpw3cpfkFwHrgp+yqf2nwZeOzOGcoGrSj+cv3lGLgU2OvnaWcFN61l2/YpnSDBA0tOebiN0nb9cDRIvXt+n+beMlBJIjPba9Ohz1RQ9DC+gv6O2GetCzABN+ilcN7yzYuFJfh+NpNemEjJpjJ1Wpu9UXUAvTH5qNNEB0FTaHY4ve8Eh+M2oicVPjwxZFYM6kT4bGk120C7FVcH/uWFv9fggTRoessZv9TsKm+lfl0EQj6cxtPrIkBskvxy/LzLEBURn9W92kTTtCiZtfEVqCIauriij/LqnWuiRdxYtUKjzeCBMnY1vgsYCk46Drf/FKQIHFrezbk+XGKKw9tjB2VYIyxQLFXMbUxHVF3Cd6kyH0/OVV7xB7iXBq4R/BGkRsJXGkx9cbnKHaRYGxuuM+okBDbCh93x02k8cotobnPEKaAM44+D8FdB4bWZtoDNZaEauNhJ5A4hQ8QhKm1GYCVQbn05F+KOsLuOT9QsBbYKI/KlTAYZH/3k9mWaRHUz+eH3kEWJqo4BhL0nP3dqjuCMYvcZnAfNm9oT3/tegIlzAdE53pVXTVB8jmiIVibQNsr/gUx5ZcmfSx/dUvIzylxBetr7trwOYrzS/qOGfZGkgEfmSrqzlOYo/Q9/8t+p2ooZxiBKgZvOgS5HUWSYM1Fht4LqGLeEkkowDSUJkadZOi9MSnSXTnDBZvU5CD9AjjDALcFUsbQg7/ApbtSgu2VBnqcIWqvhmeLyxi+6g8LzAySp+n6hVraECalDIWpV2JsnhkBcpT/gasMI24+itd6sKRQLXpdZchdgNx+wJ+xR2HVFqizDL1P0K+CCHwKRren+hN3GQ7ZyOhe/aS/7EkKM+O5zJCvadVJCS5C9XrZYYYQT6uH/wQiVM9khxl6b6VCZCJUeYoYLjOEsVEFAVi9o4Lw1WWG3pzJyJf7RGZui0ToNkMYHJGu9sHaFvkTtxkKmiiLTn+S3xa5E9cZgjmVLTH6bFGBCpMdbjMUAvD8776Sp9Br4SMcZ7gskNM1sTMlxeKOM/T2zFzmMtlgZ0hxusp1hlB5kLM1bAIHJTVBrjP02B/ibfrnUzZwha8EOM/wI/H62eCUre2LXYX3DzAc+/LxsZVH6aEU5xmCrcGpje8prO3LdlLdZ8jyFOnpyCxQ3sZm0RzD59/94kmeCjRiCCNE4r4Zi+dQfpNV9XnLDPufiMRdI6TJBSOG3lHm2SFgLd27aYjhmOW1fdk5MTOGbJqKSbel9iRtiOGYHwVAEopmDMGaYi4vloHSON7XCMOkRu1RxiWRohlD7z35uoRlIJu5qLzIrwmGiQTR9kzkUjRkyJx+AElfFtDQz/JPN8AwIejPvP6VSKVoyHCYC1/YTwKNihT7DDlBz4seFLNVaoYMwbuD4WRqWLz2fcA6Q5Ggx6SYmaiGDL0Dc37D7A80SsNsM0yMDJTcJ1JMV/+YMgTLyeZCLzttC2CZIZMgN+IPKabHYspwmPF+LH1TtjR8DMAqwzFOSzBGtIt/llrAmjIE05lsMLGgFJeGbJ5lhsxNpEO1aUqFYpgyhJ3s5HtiOSitIdtkmNXBBPftk9ROrjFDiLMfGxiwNtT5rEWGcgl6T/c3BGKEbMyQhaZJKiPJsmkZGosM024C8CCYrjczZgiB9m/8v2kSqOr4e4sMVRK8j4akk7bGDPupqIZVdOt11bDFsFCClKYDZGOGsFEYxP9hp6QKN2QAlhiqjMyDYC+z1DdnyJI1fiR8XK/GyQ7DvKO/IyGYO2JlzvCXGdPYJLO1xkirNtMKQ5mj95gO5iRYhSGE2rG7SJyFrJhUAhsMS3QwP5fMGT6L7iKZssWlRABNhkUxvJkOxjBnyCJT/OVBaTr51vqoDsP+ZRfQgaoeotDRUyKzBuYMWawds5qOErZ67UI0GL7ce8oRX14kWDxFe9I8ijnDiDH84UV92b0aBcoZ8v0tWbmAiqCv0sEY5gxZ8VPs8hlbzTPRpQx5zbXsVKCRoweYM/SuCcP/+IzVc/ilDBMJPhK8OYrMyGTWaQVG5o4KDJOMYlz3zYI2zUOGJQwfARLF4QJLKBZLUH2WugJDFtT0eBhuheHmoU7xoVoJRebosxJUOXpABYYsBUym4Dk0ssExChk+pigN7l9WjqKxowdUYMiya0HEGeqV3hcxfNT5U1ZAnVBkeyElOlj0BVdgOOD5w6U1hg+/k0gwRopisaMvkmA9hmuwNL7eOdoChvdol4ol8ALFklCtWEXqMAwtMrwrN0kZLKComqKFjh5Qj+HYGsM434MzGwOM4q6KowdUYPiTZ1hfDx8uKPPTB8XH60wdPaCKLaUwyr41b3G562GQGe8CRmfs6AE1/OFNcJE1j79ORiyVYhVHD6gR09y8BVtbWIhpZr5UKA+KJuvBLCowZCXdOPKmTCX1moIXxjRbXylFgxV9HhUYJqveHp3COsPK6mmikCKqI8Fa68P4TOl/D3lqtlkuWVsopDiQpw1LHD2g+hr/nl9LrA7Wa+lctj7cys1NGpqOHmDOkMUx97MlSe2s1v6oxhp/K5+oIhIJjrQbWJkzZKdm7wcvkoywRj1UjPI8TakUjYzMHeYMZ8kn7iU1ycf1Ntd0cm2JFAOFiLRWE2mYM2S7vvf8GuTGtD6qky9NpChvn2Xg6AHmDP8wHxjHyZCo0Qq9tXLeBVJkOmh01N2cIZS2xXFMlKT/9Fy+XlZ/y/M1aZjrYAxzhuwD/n27KXGOWqUYuvsWCr9YQQdjGDNco9SfJw7R7i63VIrVJFiBITiLx3bTnIj/K4H27prE3CRGxkwHYxgzZB9InPyKVQ3rfFZ//zAnxUpGJjVgbYbsBBB+hMOQbdOJMQx2SDNSrDpFvQoMz6Ip5btPOsWXRnvAKadR0cjcYcoQBsn6sySrxft+qfaHdXa5BSlWcfQAU4asvATOPiWFC6oz3imY7eMzKfYnlXUwhilDKPRmqwlmaspPWxhXKjCKuIYEzRmyiAZcPMRtGk0uTWsxhMbU1XQwhiFD6FXjwxCTpEYjlexAsbIEjRmCGvLquMR9yBraZWFeT5O0aqiqgzEMGX4n3lBoqASKWD7oChVD9zaqdQiaMmSHtoVzaiyz39CpoJsUa0xRz5QhtM8VNyp22nVRlaq+Vn5lI3OHGUPWhCZVx3ZJHEj5KrhaXdu2XrWtGUPwFWIEA1vdnZ2wLIQRQ+iNkV7SM+vT4SnZAhgxZIWXmfYXrHz//+CkM1tXZBLAr7rW1HmGS/kkhWTNv99xgNU/0+xfshZLfsm4XWcIHdlyXQOZmyyLTV1nyMIzyfDYpiktfoLrDJmdkagbiwRKLh1znCHYGYnJZKnvkuPOjjOEPlGo4JfFpbRuM4R4JpDV5cN5r8Lw222GvF+btLJkT4t+m8BphrznnlxKrM9QYXDqNMNv5gxVGSe2Ni7qFeUyQ977UnXCiTW/jI9hlD7FQYZcC5W1QayQqGCz1NGO5TF4D1p163losaTTZZcs/rQFVmhYzPAAIiy4E7FczEJffdIahGtRdHpBF90ewNp+q9tDunk3QgyWnilJxUB/SNVJNmcZTkoN6QNQXIMVdsRVhryvftmlSNAdU+ExXGXIW7OWJdNCtpGiuE3YxZt0PPE6Ub90r55daEIVZ7uJ6t2tQLGLC32T1FcecMDFO1h+ynXRKUXFPYcwKPWVBwKgcbn8fqi1eM162yByVzfjc1TrTitwLFSaHg4Jas/Xp4FOUgvPbYPmkftxySrLWy0GneBNEWnxC1NVPi4LuHetyu2e7eMCIizJogk4QXyqdwijU/AbrDXnaAy+DiEV7xJuD/z+w57JYMGekn1jQ7MEuEBH+27ABxbgFX+bGpodHECEkqsMi8DvkkV63SQ6woUroV73GQ5+H7Dv7nXAScHjHdlzj+XgN6rWuX++WWyEO50ryOGXuRmq60fbxpBLEOn1nskAQgV6ddJnhHwhV+1udW86YtaGuEgxOQBfycrAM3hEe3aOotAgm/Yqj45faOkcRYGg8iZDHTxzd+PWRA35FNXtHaQAL/Elukda28BSWIabBWt5cJ9K3fGLGyHhp3lCuwBfAkVHopsVd/S5U/BVwEO/nu9EjHoRCWqveYvwJYQOZvF7IxiIU9QKQdZH4GGYjx2b1PU5ECRYWwcZVuKWWqeJjQ3mRpTqnA/RfrBwLqTL9NRcmKGWbftQ+O7QQauXq32sT8KmCcn2+qmL8Yhn88moppOthpV4xzo+WTcI0yP/Aqn/1roY+0dxX0/aV7M2voVXYNqy99+KApTfKGQBKyEapP6iRb8RnkQBkqBWrF34IkEZe0Szp2t9TOep/S782WBWZTpIKcNnY9+liNkote/sNxxXrZAgRoqOja83Xj5TlQOENG4AxmmVQItGOS6P6Q1ZNGhD+/+mXkr85jhm+ZHAwlpJB2kx3uQ4aITjyx6lagao34oAH1gFQYqjf9JqjGKAaNvLFAzga6suOHrzU++nqPdhMY+zfMM4zY/4Ov0QrGK5T3/HFPuHZyuxXH+yQ5mSltsEba9el2NzzswjgoLFpibJaHZAGfHdJsi+q0XpapStASMILWaVp+t4daOXrUii6L3LDNiW5OrcCEbny4ux1Ys2812e3o3fzlqqohqmE5ovkqIBQvvLs7bqhKu3T4SCfLEVQZ+2jXQVPO+zhoGxxPv5argu0Mzp+HXyeyOHiayULEA/rQS+Glj+8bPWIaF5m7Io+O+4+JjMXpZhGI7X/f46DIeb2eRjcfwMVOTi6YkuXdhPFaLJWSbIZLCUBPhGVQTGAaHqGsAA7VsK0Axw89Jqkia4ze/RxZk9kjQ2i0BmL4zoYXSdu6J9UrzOrxKbr8nu5k3fv/6BUrrx6iZKlQFRs8P+7vfZ0aoPCcLtnzNGWGvK3swQCt6/Zy5ZTj1Ey9X8GPg3uyk1mzcLGxtYf/RzeQ6d2kI3RBS+bC+D/TmO5jgCcr15ya/VMOxoh6AJTKOoH94x7kdRe8T+B1TR9iHyULAmAAAAAElFTkSuQmCC" alt="login" />
                        <h1>SignUp</h1>
                        <h4>UserName</h4>
                        <input type="text" required placeholder=" " onChange={e => this.handleChangeText(0, e.target.value)} />
                        <h4>FullName</h4>
                        <input type="text" required placeholder=" " onChange={e => this.handleChangeText(1, e.target.value)} />
                        <h4>PassWord</h4>
                        <input type="password" required placeholder=" " onChange={e => this.handleChangeText(2, e.target.value)} />
                        <h4>Email</h4>
                        <input type="email" required placeholder=" " onChange={e => this.handleChangeText(3, e.target.value)} />

                        <span style={{ fontWeight: 'bold' }} >Read our Privacy first , if you agree , click Submit ,  <a href='#' style={{ color: 'white' }}> Privacy </a> </span>
                        <button className="btn btn-success btn-block btnLogin" onClick={this._onSignUp} style={{ marginTop: '8px' }}>
                            <span className="spanLogin">
                                Submit
                            </span>
                        </button>
                    </form>
                </div>
                {this.state.err ? (<div id="err"><i className="fas fa-exclamation-triangle">Error!!</i><h4>{this.state.err}</h4></div>) : ''}
            </div>
        )
    }
}


export default SignUp;