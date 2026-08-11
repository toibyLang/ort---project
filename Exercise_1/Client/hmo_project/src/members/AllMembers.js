import { useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { deepOrange } from '@mui/material/colors';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Divider from '@mui/material/Divider';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, Link } from "react-router-dom";
import { getAllMembersFromServer, deleteMemberFromServer } from "./memberApi"


const AllMembers = () => {
    let navigate = useNavigate()

    const deleteMember = async (member) => {
        try {
            let memberToDelete = await deleteMemberFromServer(member.id)
            alert(`המחיקה הושלמה`)
            window.location.reload();
        }
        catch (err) {
            console.log(err)
        }
    }

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
    }));

    let [mmbrArr, setMmmbrArr] = useState([])
    useEffect(() => {
        const getAllMembers = async () => {
            try {
                let res = await getAllMembersFromServer()
                setMmmbrArr(res.data)
                console.log(res)
            }
            catch (err) {
                console.log(err)
            }
        }
        getAllMembers()
    }, [])

    

    return (<div>
        <div >
                 
              {mmbrArr.map((item) => {
    return (
        <React.Fragment key={item._id}>
            <Demo>
                <List>
                    <ListItem
                        secondaryAction={
                            <ListItemText
                                primary={item.id}
                                secondary={`${item.lastName} ${item.firstName}`}
                            />
                        }
                    >
                        <>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => { deleteMember(item) }}
                            >
                                <DeleteIcon />
                            </IconButton>

                            <Link to={`/getMember/${item._id}`} state={item}>
                                <IconButton
                                    edge="end"
                                    aria-label="view"
                                    style={{ marginLeft: "1%" }}
                                >
                                    <PermIdentityIcon />
                                </IconButton>
                            </Link>

                            <Link to={`/editMember/${item._id}`} state={item}>
                                <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    style={{ marginLeft: "2%" }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Link>
                        </>
                    </ListItem>
                </List>
            </Demo>

            <Divider />
        </React.Fragment>
    );
})}
           
         </div>

    </div>);
}

export default AllMembers;