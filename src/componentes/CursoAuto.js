// npm install @mui/material @emotion/react @emotion/styled
import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import cyiapi from '../cyiapi';

function CursoAuto( {onSelect, onInput}) {
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
      const [selected, setSelected] = useState('');

/*    useEffect(() => {
        axios.get('http://localhost:5001/cursosufpr')
            .then(response => {
                setData(response.data);
                setSelected('Geral');
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
*/
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await cyiapi.get('/cursosufpr');
            setData(response.data);
            console.log(response.data[0]);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
        };
        fetchData();
    }, []);

    const handleSelect = (event, selectedValue) => {
        if (selectedValue) {
          //console.log('handleselect',selectedValue);
          setValue(selectedValue.descricao);
          onSelect(selectedValue);
        }
      };
    const handleInput = (e, selectedValue) => {
        onInput(e, selectedValue);
    };
    
    return (
        <Stack spacing={1} sx={{ width: 300 }}>
        <Autocomplete
          freeSolo
          options={data}
          getOptionLabel={(item) => item.descricao || ''}
          onChange={handleSelect} onInputChange={handleInput}
          renderInput={(params) => (
            <TextField {...params} label="Curso - Campus" variant="standard" />
          )}
        />
        </Stack>
    );
}

export default CursoAuto;
