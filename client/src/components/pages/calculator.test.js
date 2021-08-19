import { render, screen } from '@testing-library/react';
import Output from '../organisms/output'
import Input from '../organisms/Input'

describe('With React Testing Library', () => {

    it('should render text', async () => {
        render(<Output />)
        //render(<Input />)
    })
})