<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190115085334 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE note_attachment ADD image_name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE note_attachment ADD image_original_name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE note_attachment ADD image_mime_type VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE note_attachment ADD image_size INT DEFAULT NULL');
        $this->addSql('ALTER TABLE note_attachment ADD image_dimensions TEXT DEFAULT NULL');
        $this->addSql('COMMENT ON COLUMN note_attachment.image_dimensions IS \'(DC2Type:simple_array)\'');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE note_attachment DROP image_name');
        $this->addSql('ALTER TABLE note_attachment DROP image_original_name');
        $this->addSql('ALTER TABLE note_attachment DROP image_mime_type');
        $this->addSql('ALTER TABLE note_attachment DROP image_size');
        $this->addSql('ALTER TABLE note_attachment DROP image_dimensions');
    }
}
