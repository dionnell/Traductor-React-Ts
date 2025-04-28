import { useEffect } from "react"
import { useDebounce } from "../hooks/useDebounce"
import { useStore } from "../hooks/useStore"
import { translate } from "../services/translate"
import { Button, Col, Container, Row } from "react-bootstrap"
import { LanguageSelector } from "../components/LanguageSelector"
import { SectionTypes } from "../types.d"
import { TextArea } from "../components/TextArea"
import { ArrowIcons, CopyIcon, SpeakIcon } from "../components/icons"
import { AUTO_LANGUAGE } from "../constants"


export const TranslateMobile = () => {

    const { 
      loading, 
      fromLanguage, 
      toLanguage, 
      fromText,
      result, 
      setFromText, 
      setResult, 
      interchangeLaguage, 
      setFromLanguage, 
      setToLanguage
    } = useStore()
  
    const deboundText = useDebounce(fromText, 600)
  
    useEffect(() => {
      if(deboundText === '') return
  
      translate({ fromLanguage, toLanguage, text: fromText })
        .then(result => {
          if(result == null) return
  
          setResult(result)
        })
        .catch(() => { setResult('Error') })
      
    }, [deboundText, fromLanguage, toLanguage])
  
    const handleClipboard = () => {
      navigator.clipboard.writeText(result)
    }
  
    const handleSpeak = () => {
      const utterance = new SpeechSynthesisUtterance(result)
      utterance.lang = toLanguage
      utterance.rate = 0.75
      window.speechSynthesis.speak(utterance)
    }
  
    
    return (
      <Container fluid>
        <h3>Google Translate</h3>
        <Row className='mb-3 mt-3'>
          <Col>
              <LanguageSelector
                type={SectionTypes.FROM}
                value={fromLanguage} 
                onChange={setFromLanguage}
                />
          </Col>
          <Col xs='auto'>
            <Button
              variant='link'
              disabled= {fromLanguage === AUTO_LANGUAGE} 
              onClick={interchangeLaguage}>
              <ArrowIcons/>
            </Button>
          </Col>
          <Col>
              <LanguageSelector
                type={SectionTypes.TO}
                value={toLanguage} 
                onChange={setToLanguage}/>
            </Col>

        </Row>
        <Row className='mb-3'>
            <Col>
            <TextArea
                type={SectionTypes.FROM}
                value={fromText}
                onChange={setFromText}
                
              />

              <div style={{ position: 'relative' }} className='mt-3'>
                <TextArea
                  loading= {loading}
                  type={SectionTypes.TO}
                  value={result}
                  onChange={setResult}
                />
                <div style={{ position: 'absolute', left: 5, bottom: 5 }}>
                  <Button
                    variant='link'
                    onClick={handleClipboard} >
                    <CopyIcon/>
                  </Button>
  
                  <Button
                    variant='link'
                    onClick={handleSpeak} >
                    <SpeakIcon/>
                  </Button>
                </div>
                
              </div>
            </Col>
        </Row>
      </Container>
    )
  }
