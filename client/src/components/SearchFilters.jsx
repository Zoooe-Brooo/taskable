import { Box, Input, Select, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Stack, Text, Flex } from '@chakra-ui/react';

const SearchFilters = ({ onFilterChange, filters = { search: '', category: '', priceRange: [0, 200] } }) => {
  return (
    <Box p={6} mx={4} mt={4} bg="rgba(255, 255, 255, 0.1)" borderRadius="lg" backdropFilter="blur(10px)">
      <Stack spacing={6}>
        <Input 
          placeholder="Search by name or service..."
          onChange={(e) => onFilterChange('search', e.target.value)}
          value={filters.search}
          bg="white"
          size="lg"
          _placeholder={{ color: 'gray.500' }}
        />
        <Select 
          placeholder="Select service type"
          onChange={(e) => onFilterChange('category', e.target.value)}
          value={filters.category}
          bg="white"
          size="lg"
        >
          <option value="Website Development">Website Development</option>
          <option value="Mobile App Design">Mobile App Design</option>
          <option value="Database Optimization">Database Optimization</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Cloud Architecture">Cloud Architecture</option>
          <option value="DevOps Engineering">DevOps Engineering</option>
        </Select>
        <Box>
          <Flex justify="space-between" mb={2}>
            <Text color="white">Price Range ($/hr)</Text>
            <Text color="white">${filters.priceRange[0]} - ${filters.priceRange[1]}</Text>
          </Flex>
          <RangeSlider 
            value={filters.priceRange}
            min={0} 
            max={200}
            step={5}
            onChange={(val) => onFilterChange('priceRange', val)}
          >
            <RangeSliderTrack bg="white">
              <RangeSliderFilledTrack bg="teal.500" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </Box>
      </Stack>
    </Box>
  );
};

export default SearchFilters;
