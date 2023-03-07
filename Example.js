import { Text, View } from 'react-native'
import { withExpoSnack, styled } from 'nativewind'

const StyledView = styled(View)
const StyledText = styled(Text)

const App = () => {
  return (
    <StyledView className="bg-orange-400 flex-1 items-center justify-center">
      <StyledText className="text-xl">
       CYRANO WEB APP
      </StyledText>
    </StyledView>
  )
}

export default withExpoSnack(App)
