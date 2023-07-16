import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from "@mui/material";
import BmiRange from "../assets/bmirange.png";


const BmiRangeInfo = () => {
    return (
        <Tooltip title={<img src={BmiRange} alt="BMI ranges" width={280} />} placement='bottom'
            componentsProps={{ tooltip: { sx: { backgroundColor: 'lightgray' } } }} enterTouchDelay={0}>
            <InfoIcon sx={{ color: 'primary.main' }} />
        </Tooltip>
    );

};

export default BmiRangeInfo;