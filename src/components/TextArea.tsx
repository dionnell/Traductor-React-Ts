import { Form } from "react-bootstrap"
import { SectionTypes } from "../types.d"

interface Props  { 
    type: SectionTypes,
    loading?: boolean, 
    value: string, 
    onChange: (value: string) => void
}

const commonStyles = {
    border: 0,
    height: '200px',
    resize: 'none',
}

const getPlacerholader = ({type, loading}: {type: SectionTypes, loading?: boolean}) => {
    if (type === SectionTypes.FROM) return 'Introducir Texto'
    if (loading === true) return 'Cargando...'

    return 'Traduccion'
}

export const TextArea = ({type, loading, value, onChange}: Props) => {

    const styles = type === SectionTypes.FROM 
    ? {
        ...commonStyles
    } : {
        ...commonStyles,
        backgroundColor: '#f5f5f5',
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

  return (
    <Form.Control
              as='textarea'
              autoFocus={type === SectionTypes.FROM}
              disabled={type === SectionTypes.TO}
              placeholder={getPlacerholader({type, loading})}
              style={styles}
              value={value}
              onChange={handleChange}
    />
  )
}
