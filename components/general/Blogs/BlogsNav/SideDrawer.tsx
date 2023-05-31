import BookIcon from "@mui/icons-material/Book";
import CottageIcon from "@mui/icons-material/Cottage";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from "@mui/material";
import { auth } from "components/general/firebase-config";
import Link from "next/link";
import { useRouter } from "next/router";


export default function SideDrawer() {
    const router = useRouter();
  
    const handleLogOutClick = async () => {
      try {
        await auth.signOut();
        if (window) {
          // @ts-ignore
          window.localStorage.setItem("loggedIn", "false");
        }
        router.push("/");
      } catch (e) {
        console.log(e);
      }
    };
  
    return (
      <>
        <Toolbar sx={{ justifyContent: "end", paddingBlock: "1.5rem" }}>
          <Avatar
            sx={{
              bgcolor: "rgb(233, 171, 2)",
              width: "3.2rem",
              height: "3.2rem",
            }}
            alt=""
            src="/broken-image.jpg"
          />
        </Toolbar>
  
        <Divider />
  
        <List>
          {["Home", "Book Appointment", "Edit", "Logout"].map((text, index) =>
            index !== 3 ? (
              <Link
                href={
                  index === 0 ? "/blogs" : index === 1 ? "/app" : "/blogs/edit"
                }
                key={text}
              >
                <ListItem key={text} disablePadding>
                  <ListItemButton sx={{ paddingBlock: "1rem" }}>
                    <ListItemIcon sx={{ color: "black!important" }}>
                      {index === 0 && <CottageIcon />}
                      {index === 1 && <BookIcon />}
                      {index === 2 && <EditIcon />}
                      {index === 3 && <LogoutIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  sx={{ paddingBlock: "1rem" }}
                  onClick={handleLogOutClick}
                >
                  <ListItemIcon sx={{ color: "black!important" }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </>
    );
  }