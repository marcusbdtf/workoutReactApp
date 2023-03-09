import { InteractionType } from "@azure/msal-browser";
import { useMsalAuthentication } from "@azure/msal-react";
import { useState, useEffect } from "react";

import {fetchData} from '../fetch'

export const Profile = ()=>{
    const [graphData, setGraphData] = useState(null);
    const { result, error} = useMsalAuthentication(InteractionType.Popup,{
        scopes:['user.read']
    });
    // Followed lesson in AAD
    useEffect(() => {
        if (!!graphData){
            return;
        }
        if (!!error){
            console.log(error);
            return;
        }
        if (result){
            const {acessToken} = result;
            fetchData('https://graph.microsoft.com/v1.0/me', acessToken)
            .then(response => setGraphData(response))
            .catch(error => console.log(error));
        }
    },[graphData, error, result]);

    return(
        <>
        { graphData ? <ProfileData graphData = {graphData}/> : null }
        </>
    )
}