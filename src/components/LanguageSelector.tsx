import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { SectionTypes, type FromLanguage, type Language } from '../types.d'

type Props =
  | {type: SectionTypes.FROM, value: FromLanguage, onChange: (language: FromLanguage) => void}
  | {type: SectionTypes.TO, value: Language, onChange: (language: Language) => void}


export const LanguageSelector = ({onChange, type, value}: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }
  return (
    <Form.Select aria-label='Selecciona el idioma' onChange={handleChange} value={value}>
        {type === SectionTypes.FROM && <option value={AUTO_LANGUAGE}>Detectar Idioma</option>}

        {Object.entries(SUPPORTED_LANGUAGES).map(([hey, literal]) => (
            <option key={hey} value={hey}>
            {literal}
            </option>
        ))}
    </Form.Select>
  )
}
