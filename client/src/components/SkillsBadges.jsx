import { Flex, Tag, TagLabel, TagLeftIcon, Tooltip } from '@chakra-ui/react';
import { FaCheck, FaGithub, FaCode } from 'react-icons/fa';

const SkillsBadges = ({ skills }) => {
  return (
    <Flex wrap="wrap" gap={2}>
      {skills.map((skill, index) => (
        <Tooltip 
          key={index}
          label={`Verified via ${skill.verifiedBy}`}
          hasArrow
        >
          <Tag 
            size="lg" 
            colorScheme={skill.verified ? "green" : "gray"}
            variant="subtle"
          >
            <TagLeftIcon as={skill.verified ? FaCheck : FaCode} />
            <TagLabel>{skill.name}</TagLabel>
          </Tag>
        </Tooltip>
      ))}
    </Flex>
  );
};