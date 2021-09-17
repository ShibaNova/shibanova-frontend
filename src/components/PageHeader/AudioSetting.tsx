import React from 'react'
import { Box, Flex, Text, useMatchBreakpoints } from '@becoswap-libs/uikit'
import { useAudioModeManager } from 'state/user/hooks'

type AudioSettingModalProps = {
  translateString: (translationId: number, fallback: string) => string
}

const AudioSetting = ({ translateString }: AudioSettingModalProps) => {
  const { isSm, isXs } = useMatchBreakpoints()
  const [audioPlay, toggleSetAudioMode] = useAudioModeManager()

  // Disable component completely since following the changes below we
  // ended up with an empty Audio section in the swap settings.
  return null

  return (
    <Box mb="16px">
      <Flex alignItems="center" mb="8px">
        <Text bold>{translateString(999, 'Audio')}</Text>
      </Flex>
      {/* <Box>
        <PancakeToggle scale={isSm || isXs ? 'sm' : 'md'} checked={audioPlay} onChange={toggleSetAudioMode} />
      </Box> */}
    </Box>
  )
}

export default AudioSetting
