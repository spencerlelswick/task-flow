import { useState } from 'react';
import { FormSignup } from '../components';
import Wrapper from '../assets/page-wrappers/Signup';

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    first_name: '',
    last_name: '',
    role: 'E',
    password: '',
  });

  return (
    <Wrapper>
      <FormSignup user={user} setUser={setUser} />
    </Wrapper>
  );
}
