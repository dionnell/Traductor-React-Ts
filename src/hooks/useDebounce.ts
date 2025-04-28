import { useEffect, useState } from "react";


export function useDebounce<T>(value: T, delay = 500) {

    const [debuanceValue, setDebuanceValue] = useState(value)

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebuanceValue(value)
      }, delay)

      return () => clearTimeout(timer)

    }, [value, delay] )
 
    return debuanceValue
}