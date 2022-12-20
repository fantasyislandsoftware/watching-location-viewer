import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { Item } from "../interface";
import { FC } from "react";
import Close from "@mui/icons-material/Close";
import { DialogContentText } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface IProps {
  selectedItem: Item | undefined;
  setSelectedItem: (item: Item | undefined) => void;
}

const VideoPlayer: FC<IProps> = ({ selectedItem, setSelectedItem }) => {

  const handleClose = () => {
    setSelectedItem(undefined);
  };

  const zoom = 1.2;
  const width = 650 * zoom;
  const height = 315 * zoom;

  return (
    <div>
      
      <Dialog
        open={selectedItem !== undefined ? true : false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle id="alert-dialog-title">
        {selectedItem?.scene_description}
        </DialogTitle>
        <DialogContent style={{textAlign : 'center'}}>
          <iframe
            width={`${width}`}
            height={`${height}`}
            src={
              selectedItem
                ? `${selectedItem.scene_video_link}?start=${selectedItem.scene_video_link_offset}&autoplay=1`
                : ""
            }
            title="YouTube video player"
            frameBorder={"0"}
            allow="accelerometer; autoplay; mute; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen={true}
          ></iframe>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VideoPlayer;
