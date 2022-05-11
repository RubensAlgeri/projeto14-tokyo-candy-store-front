import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

import Reset from "../themes/Reset";
import Style from "../themes/Style"

import UserContext from "../contexts/UserContext";
import TelaCadastro from "./TelaCadastro"
import TelaLogin from "./TelaLogin"

export default function App(){
	const [userData, setUserData] = React.useState([])
    return(
        <>
		<Reset />
        <Style />
			<BrowserRouter>
				<UserContext.Provider value={{ userData, setUserData}}>
					<Routes>
						<Route path="/" element={<TelaLogin />} />
						<Route path="/cadastro" element={<TelaCadastro />} />
					</Routes>
				</UserContext.Provider>
			</BrowserRouter>
        </>
    );
}