import React from "react";

function NoUser(){
    return(<div className="no-user">
        <h2 className="no-user-heading">
            Dear User, Currently you are logged out, please <a href="/login">login</a> here.
            <br /><br />If you don't have an account <a href="/register">register</a> here.
        </h2>
    </div>)
}

export default NoUser;