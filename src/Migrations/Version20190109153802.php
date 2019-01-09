<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190109153802 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE user_confirmation_key ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE user_confirmation_key ADD CONSTRAINT FK_D5E4195A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D5E41958A90ABA9 ON user_confirmation_key (key)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D5E4195A76ED395 ON user_confirmation_key (user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE user_confirmation_key DROP CONSTRAINT FK_D5E4195A76ED395');
        $this->addSql('DROP INDEX UNIQ_D5E41958A90ABA9');
        $this->addSql('DROP INDEX UNIQ_D5E4195A76ED395');
        $this->addSql('ALTER TABLE user_confirmation_key DROP user_id');
    }
}
