import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Drawer,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavigationItem } from "../Header/useHeader";
import { useAuth } from "../../Context/AuthContext";

export const MainDrawer = (props: any) => {
  const { user, logout } = useAuth();

  return (
    <Drawer open={props.open} ModalProps={{ onBackdropClick: props.onClose }}>
      <Box sx={{ width: 275, height: "100%" }} display="flex" flexDirection="column" role="presentation">
        <Stack spacing={2} direction="row" sx={{ p: 1 }}>
          <Typography variant="h1" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
          <IconButton onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ py: 0.5 }} />
        <List sx={{ flexGrow: 1 }}>
          {props.navigationItems.map((item: NavigationItem) =>
            item.authRequired ? (
              <ListItem
                key={item.slug}
                disablePadding
                onClick={() => {
                  item.onClick();
                  props.onClose();
                }}>
                <ListItemButton sx={{ p: 1 }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem
                onClick={() => {
                  item.onClick();
                  props.onClose();
                }}
                key={item.slug}
                disablePadding>
                <ListItemButton sx={{ p: 1 }}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        {user && (
          <>
            <Divider />
            <ListItem
              disablePadding
              onClick={() => {
                props.onClose();
                logout();
              }}>
              <ListItemButton sx={{ py: 2 }} autoFocus>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </Box>
    </Drawer>
  );
};
