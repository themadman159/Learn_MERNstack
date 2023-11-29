import { BrowserRouter , Switch , Route } from "react-router-dom"
import App from "./App"
import Formcomponents from "./components/Formcomponents"
import Singlecomponents from "./components/Singlecomponents"
import Editblogcomponents from "./components/Editblogcomponents"
import Logincomponents from "./components/Loginconponents"
import AdminRoute from "./AdminRoute"

const MyRoute = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App}/>
                <AdminRoute path="/create" exact component={Formcomponents}/>
                <Route path="/blog/:slug" exact component={Singlecomponents}/>
                <AdminRoute path="/blog/edit/:slug" exact component={Editblogcomponents}/>
                <Route path="/login" exact component={Logincomponents} />

            </Switch>
        </BrowserRouter>
    )
}

export default MyRoute ;
