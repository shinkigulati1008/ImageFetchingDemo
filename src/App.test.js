import axios from 'axios';
import { render, waitFor, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios');

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch and display images on mount', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, title: 'accusamus beatae ad facilis cum similique qui sunt', url: 'https://via.placeholder.com/600/92c952', thumbnailUrl: 'https://via.placeholder.com/150/92c952' },
        { id: 2, title: 'reprehenderit est deserunt velit ipsam', url: 'https://via.placeholder.com/600/771796', thumbnailUrl: 'https://via.placeholder.com/150/771796' },
      ],
    });

   render(<App />);
    const images = await screen.findAllByRole('img');
    expect(images).toHaveLength(2);

    // Check that image grid is displayed
    expect(screen.getByText('Image Gallery')).toBeInTheDocument();
    expect(images).toHaveLength(2);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/photos?_limit=24&_page=1'
    );
  });

  it('should fetch more images when scrolling to bottom of page', async () => {
    const mockData1 = [
      { id: 1, title: 'accusamus beatae ad facilis cum similique qui sunt', url: 'https://via.placeholder.com/600/92c952', thumbnailUrl: 'https://via.placeholder.com/150/92c952' },
      { id: 2, title: 'reprehenderit est deserunt velit ipsam', url: 'https://via.placeholder.com/600/771796', thumbnailUrl: 'https://via.placeholder.com/150/771796' },
    ];
    const mockData2 = [
      { id: 3, title: 'officia porro iure quia iusto qui ipsa ut modi', url: 'https://via.placeholder.com/600/24f355', thumbnailUrl: 'https://via.placeholder.com/150/24f355' },
      {  id: 4, "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae", "url": "https://via.placeholder.com/600/d32776", "thumbnailUrl": "https://via.placeholder.com/150/d32776" },
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockData1 })).mockImplementationOnce(() => Promise.resolve({ data: mockData2 }));
    render(<App />);
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(2);
    });
    window.dispatchEvent(new Event('scroll'));
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(4));   
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/photos?_limit=24&_page=1'
    );
    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/photos?_limit=24&_page=2'
    );
  });
});