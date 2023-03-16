import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    API_URL_ORGANIZATION_LIST,
} from "../../api/Urls";
import OrganizationForm  from './OrganizationForm'
import { useParams } from "react-router-dom";

const OrganizationDetail = () => {
    const [organization, setOrganization] = useState({});

    let { id } = useParams();

    const getOrganization = async () => {
        const organization = await axios.get(`${API_URL_ORGANIZATION_LIST}${id}`, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
        setOrganization(PrevOrganization => organization.data);
      };

    useEffect(() => {
        getOrganization();
    }, [organization.name]);
  
    return (    
        <OrganizationForm organizationData={organization} bankData={organization.bank_detail || {}}/>
    );
  };
  
  export default OrganizationDetail;
  