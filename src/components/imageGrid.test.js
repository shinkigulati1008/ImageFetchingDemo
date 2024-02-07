import { render, screen, fireEvent } from '@testing-library/react';
import ImageGrid from './ImageGrid';

describe('ImageGrid', () => {
  const images = [
    { id: 1, title: 'accusamus beatae ad facilis cum similique qui sunt', url: 'https://via.placeholder.com/600/92c952', thumbnailUrl: 'https://via.placeholder.com/150/92c952' },
    { id: 2, title: 'reprehenderit est deserunt velit ipsam', url: 'https://via.placeholder.com/600/771796', thumbnailUrl: 'https://via.placeholder.com/150/771796' },
    { id: 3, title: 'officia porro iure quia iusto qui ipsa ut modi', url: 'https://via.placeholder.com/600/24f355', thumbnailUrl: 'https://via.placeholder.com/150/24f355' },
  ];

  it('renders an image grid with the images provided', () => {
    render(<ImageGrid images={images} />);
    const domImages = screen.getAllByRole('img');
    expect(domImages).toHaveLength(images.length);
  });

  it('clicking on an image shows a modal with the full-sized image', () => {
    render(<ImageGrid images={images} />);
    const image1 = screen.getByAltText('accusamus beatae ad facilis cum similique qui sunt');
    fireEvent.click(image1);
    expect(screen.getByText('Image Preview')).toBeInTheDocument();
    expect(screen.getByAltText('accusamus beatae ad facilis cum similique qui sunt')).toBeInTheDocument();
  });

  it('displays the selected image in the modal', () => {
    render(<ImageGrid images={images} />);
    const image = screen.getByAltText('accusamus beatae ad facilis cum similique qui sunt');
    fireEvent.click(image);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  it('closes the modal when the close button is clicked', () => {
    render(<ImageGrid images={images} />);
    const image = screen.getByAltText('accusamus beatae ad facilis cum similique qui sunt');
    fireEvent.click(image);
    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);
    const modal = screen.queryByText('<div class="modal-title h4">Image Preview</div>');
    expect(modal).not.toBeInTheDocument();
  });
});