import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ProgressBar } from '../components/ProgressBar';

describe('ProgressBar', () => {
    it('renders percentage text', () => {
        const { getByText } = render(<ProgressBar raised={50} goal={100} />);
        expect(getByText('50%')).toBeInTheDocument();
    });

    it('renders 0% when not raised anything', () => {
        const { getByText } = render(<ProgressBar raised={0} goal={100} />);
        expect(getByText('0%')).toBeInTheDocument();
    });

    it('clamps display to 100% when over-raised', () => {
        const { getByText } = render(<ProgressBar raised={200} goal={100} />);
        expect(getByText('100%')).toBeInTheDocument();
    });

    it('renders raised amount label', () => {
        const { getByText } = render(<ProgressBar raised={250} goal={1000} />);
        expect(getByText('250.00 XLM raised')).toBeInTheDocument();
    });

    it('renders goal label', () => {
        const { getByText } = render(<ProgressBar raised={250} goal={1000} />);
        expect(getByText('Goal: 1000.00 XLM')).toBeInTheDocument();
    });

    it('has correct aria attributes', () => {
        const { getByRole } = render(<ProgressBar raised={75} goal={100} />);
        const bar = getByRole('progressbar');
        expect(bar).toHaveAttribute('aria-valuenow', '75');
        expect(bar).toHaveAttribute('aria-valuemin', '0');
        expect(bar).toHaveAttribute('aria-valuemax', '100');
    });

    it('hides labels when showLabels=false', () => {
        const { queryByText } = render(<ProgressBar raised={50} goal={100} showLabels={false} />);
        expect(queryByText('50%')).not.toBeInTheDocument();
    });
});
