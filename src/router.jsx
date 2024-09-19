import { Routes, Route, BrowserRouter } from "react-router-dom";

import {
    Home,

    TabonePageone,
    TabonePagetwo,
    TabonePagethree,

    TabtwoPageone,
    TabtwoPagetwo,
    TabtwoPagethree,

    TabthreePageone,
    TabthreePagetwo,
    TabthreePagethree,
    TabthreePagefour,


} from './pages/index';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route index element={<TabonePageone />} />
                    <Route path="tabonePageone" element={<TabonePageone />} />
                    <Route path="tabonePagetwo" element={<TabonePagetwo />} />
                    <Route path="tabonePagethree" element={<TabonePagethree />} />

                    <Route path="tabtwoPageone" element={<TabtwoPageone />} />
                    <Route path="tabtwoPagetwo" element={<TabtwoPagetwo />} />
                    <Route path="tabtwoPagethree" element={<TabtwoPagethree />} />

                    <Route path="tabthreePageone" element={<TabthreePageone />} />
                    <Route path="tabthreePagetwo" element={<TabthreePagetwo />} />
                    <Route path="tabthreePagethree" element={<TabthreePagethree />} />
                    <Route path="tabthreePagefour" element={<TabthreePagefour />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}