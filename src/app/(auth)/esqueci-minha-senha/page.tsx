'use client'

import { useState } from 'react'

import { StepOne } from './components/step-one'
import { StepTwo } from './components/step-two'

export default function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')

  if (step === 1) {
    return <StepOne setEmail={setEmail} setStep={setStep} />
  }

  return <StepTwo email={email} />
}
