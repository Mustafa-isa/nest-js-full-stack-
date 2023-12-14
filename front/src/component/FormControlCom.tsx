import { FormControl, TextField } from "@mui/material";

type FprmProps = {
  email: unknown;
  type: string;
  name: string;
  value: string;
  onChange: any;
  error: boolean,
  helperText: "string";
  label:"string"
};

function FormControlCom(props: FprmProps) {
  return (
    <FormControl fullWidth>
      <TextField
        label={props.label}
        variant="outlined"
        margin="normal"
        type="email"
        name="email"
        value={props.email}
        onChange={props.onChange}
        error={props.error}
        helperText={props.helperText}
      />
    </FormControl>
  );
}

export default FormControlCom;
